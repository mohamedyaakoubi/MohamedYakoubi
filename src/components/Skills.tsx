"use client"

import { motion } from "framer-motion"

const skills = [
  { category: "Languages", items: ["Arabic", "English", "French", "German"] },
  { category: "Web Development", items: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js"] },
  { category: "Programming", items: ["Python", "C"] },
  { category: "AI & ML", items: ["TensorFlow", "PyTorch", "Scikit-learn"] },
  { category: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Azure"] },
  { category: "Databases", items: ["SQL", "Firebase"] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-600 text-sm rounded-full px-3 py-1"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

