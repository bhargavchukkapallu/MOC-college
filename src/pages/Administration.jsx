import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck, 
  HiUsers, 
  HiAcademicCap, 
  HiBuildingLibrary, 
  HiUserCircle, 
  HiBriefcase 
} from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Data will be fetched dynamically from org_structure.json

const OrgNodeComponent = ({ data }) => {
  return (
    <div className="relative group cursor-pointer shrink-0">
      <Handle type="target" position={Position.Top} className="opacity-0 w-1 h-1 pointer-events-none" />

      <div className="bg-brand-primary text-white px-4 py-3 rounded-xl shadow-lg font-medium text-[13px] text-center border-2 border-brand-secondary/30 hover:bg-[#600000] hover:border-brand-secondary/70 transition-all w-[180px] leading-snug">
        {data.label || 'Loading...'}
      </div>

      <div className="absolute top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-56 bg-white text-gray-800 text-xs rounded-xl shadow-xl border border-gray-100 p-4 z-[9999] pointer-events-none transition-all duration-200 translate-y-2 group-hover:translate-y-0">
        <h4 className="font-bold text-brand-primary mb-2 border-b pb-2">{data.label}</h4>
        <ul className="space-y-1.5 text-left">
          {data.members?.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full mt-1.5 shrink-0"></span>
              <span className="text-gray-600 font-medium">{m}</span>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white drop-shadow-sm"></div>
      </div>

      <Handle type="source" position={Position.Bottom} className="opacity-0 w-1 h-1 pointer-events-none" />
    </div>
  );
};

const nodeTypes = { orgNode: OrgNodeComponent };

const initialNodes = [
  { id: 'trust', type: 'orgNode', position: { x: 500, y: 0 }, data: { label: 'Loading...', members: [] } },
  { id: 'management', type: 'orgNode', position: { x: 500, y: 100 }, data: { label: 'Loading...', members: [] } },
  { id: 'correspondent', type: 'orgNode', position: { x: 500, y: 200 }, data: { label: 'Loading...', members: [] } },
  { id: 'principal', type: 'orgNode', position: { x: 500, y: 300 }, data: { label: 'Loading...', members: [] } },

  { id: 'academic', type: 'orgNode', position: { x: 300, y: 400 }, data: { label: 'Loading...', members: [] } },
  { id: 'administrative', type: 'orgNode', position: { x: 700, y: 400 }, data: { label: 'Loading...', members: [] } },

  { id: 'iqac', type: 'orgNode', position: { x: 200, y: 500 }, data: { label: 'Loading...', members: [] } },
  { id: 'hod', type: 'orgNode', position: { x: 400, y: 500 }, data: { label: 'Loading...', members: [] } },
  { id: 'lecturers', type: 'orgNode', position: { x: 400, y: 600 }, data: { label: 'Loading...', members: [] } },
  { id: 'students', type: 'orgNode', position: { x: 400, y: 700 }, data: { label: 'Loading...', members: [] } },

  { id: 'jrAssistant', type: 'orgNode', position: { x: 500, y: 500 }, data: { label: 'Loading...', members: [] } },
  { id: 'computerOperator', type: 'orgNode', position: { x: 700, y: 500 }, data: { label: 'Loading...', members: [] } },
  { id: 'officeSubOrdinates', type: 'orgNode', position: { x: 900, y: 500 }, data: { label: 'Loading...', members: [] } },
];

const edgeStyle = { stroke: '#800000', strokeWidth: 2 };
const initialEdges = [
  { id: 'e1', source: 'trust', target: 'management', type: 'smoothstep', style: edgeStyle },
  { id: 'e2', source: 'management', target: 'correspondent', type: 'smoothstep', style: edgeStyle },
  { id: 'e3', source: 'correspondent', target: 'principal', type: 'smoothstep', style: edgeStyle },

  { id: 'e4', source: 'principal', target: 'academic', type: 'smoothstep', style: edgeStyle, animated: true },
  { id: 'e5', source: 'principal', target: 'administrative', type: 'smoothstep', style: edgeStyle, animated: true },

  { id: 'e6', source: 'academic', target: 'iqac', type: 'smoothstep', style: edgeStyle },
  { id: 'e7', source: 'academic', target: 'hod', type: 'smoothstep', style: edgeStyle },

  { id: 'e8', source: 'hod', target: 'lecturers', type: 'smoothstep', style: edgeStyle },
  { id: 'e9', source: 'lecturers', target: 'students', type: 'smoothstep', style: edgeStyle },

  { id: 'e10', source: 'administrative', target: 'jrAssistant', type: 'smoothstep', style: edgeStyle },
  { id: 'e11', source: 'administrative', target: 'computerOperator', type: 'smoothstep', style: edgeStyle },
  { id: 'e12', source: 'administrative', target: 'officeSubOrdinates', type: 'smoothstep', style: edgeStyle },
];

const Administration = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Small delay to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [governingData, setGoverningData] = useState([]);

  useEffect(() => {
    // Fetch Org Structure
    fetch(`${import.meta.env.BASE_URL}json_data/org_structure.json`)
      .then(res => res.json())
      .then(data => {
        setNodes((nds) =>
          nds.map(node => ({
            ...node,
            data: data[node.id] || { label: node.id, members: [] }
          }))
        );
      })
      .catch(err => console.error("Error loading org structure:", err));

    // Fetch Governing Body Data
    fetch(`${import.meta.env.BASE_URL}json_data/governing_body.json`)
      .then(res => res.json())
      .then(data => setGoverningData(data))
      .catch(err => console.error("Error loading governing body:", err));
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const adminStaff = [
    { name: "Mr. B. Srinivasa Rao", role: "Office Superintendent", icon: <HiBriefcase className="w-6 h-6" /> },
    { name: "Mrs. T. Lakshmi", role: "Senior Assistant", icon: <HiUserCircle className="w-6 h-6" /> },
    { name: "Mr. K. Ramana", role: "Junior Assistant", icon: <HiUserCircle className="w-6 h-6" /> },
    { name: "Mrs. V. Saraswathi", role: "Librarian", icon: <HiAcademicCap className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" fillOpacity="0.05" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Institutional Leadership
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-brand-secondary">Administration</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
              Guided by a commitment to excellence, our administrative team works tirelessly
              to ensure a supportive and enriching environment for all students and staff.
            </p>
            <Breadcrumbs />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-32">

          {/* Governance Structure */}
          <section id="governing-body">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
                <HiBuildingLibrary className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black text-brand-dark mb-4">Governing Body & Management</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                The strategic direction and governance of Matrusri Oriental College are
                overseen by our dedicated Trustees and Management Committee.
              </p>
            </motion.div>

            <div className="space-y-16">
              {governingData.map((section, sIdx) => (
                <div key={sIdx}>
                  <h3 className="text-2xl font-black text-brand-primary mb-8 border-b border-gray-100 pb-4 inline-block">{section.category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.members.map((member, idx) => (
                      <motion.div
                        key={idx}
                        {...fadeInUp}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-brand-secondary/30 transition-colors"></div>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
                            <HiUsers className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-brand-dark mb-1 leading-tight">{member.name}</h3>
                            <p className="text-brand-primary font-bold text-xs uppercase tracking-wider mb-2">{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Organisational Structure Chart */}
          <section id="org-structure">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] uppercase bg-brand-primary/10 text-brand-primary rounded-full">
                Hierarchy
              </span>
              <h2 className="text-4xl font-black text-brand-dark mb-4">Administration / Organisational Structure</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Explore our interactive organizational framework. You can pan and zoom the flowchart below. Hover over any functional group to view its members.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="w-full h-[650px] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.5}
                maxZoom={1.5}
                attributionPosition="bottom-right"
              >
                <Background color="#ccc" gap={16} />
                <Controls />
              </ReactFlow>
            </motion.div>
          </section>

          {/* Administrative Staff */}
          <section id="staff">
            <motion.div {...fadeInUp} className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(128,0,0,0.15),transparent_50%)]"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-4xl font-black text-white mb-4">Administrative Staff</h2>
                    <p className="text-white/70 text-lg max-w-xl">
                      Our professional administrative staff ensures smooth daily operations
                      and provides essential support services to our academic community.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                    <span className="block text-2xl font-black text-white">Office</span>
                    <span className="text-[10px] font-black uppercase text-brand-secondary tracking-widest">Team Members</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {adminStaff.map((staff, idx) => (
                    <motion.div
                      key={idx}
                      {...fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all text-center group"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-secondary mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {staff.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{staff.name}</h4>
                      <p className="text-white/60 text-sm font-medium">{staff.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Office Hours & Contact */}
          <section id="office" className="text-center pb-12">
            <motion.div {...fadeInUp} className="max-w-2xl mx-auto bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              <HiShieldCheck className="w-16 h-16 text-brand-primary mx-auto mb-6" />
              <h2 className="text-3xl font-black text-brand-dark mb-4">Administrative Office</h2>
              <p className="text-gray-600 mb-8 font-medium text-lg">
                For administrative inquiries, certificates, and official documents, please visit our office during working hours.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                <div className="bg-gray-50 px-6 py-4 rounded-2xl text-left">
                  <span className="block text-[10px] font-black uppercase text-brand-primary tracking-widest mb-1">Working Days</span>
                  <span className="text-gray-800 font-bold">Monday - Saturday</span>
                </div>
                <div className="bg-gray-50 px-6 py-4 rounded-2xl text-left">
                  <span className="block text-[10px] font-black uppercase text-brand-primary tracking-widest mb-1">Office Hours</span>
                  <span className="text-gray-800 font-bold">10:00 AM - 5:00 PM</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-full font-black hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20"
              >
                Contact Administration
              </Link>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Administration;
