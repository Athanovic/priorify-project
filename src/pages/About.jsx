import { CheckSquare, Target, Users, Lightbulb } from "lucide-react";

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <CheckSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Priorify
        </h1>
        <p className="text-xl text-gray-600">
          A simple yet powerful task management solution
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 mb-4">
          Priorify was built to help individuals and teams stay organized and
          focused on what truly matters. We believe effective task management
          shouldn't be complicated or overwhelming.
        </p>
        <p className="text-gray-600">
          Our goal is to provide a clean, intuitive interface that helps you
          prioritize work, track progress, and achieve goals efficiently.
        </p>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ValueCard
          icon={<Target className="w-10 h-10 text-blue-600" />}
          title="Focus"
          description="Stay focused on high-priority tasks that drive results"
        />
        <ValueCard
          icon={<Users className="w-10 h-10 text-green-600" />}
          title="Simplicity"
          description="Clean interface designed for ease of use"
        />
        <ValueCard
          icon={<Lightbulb className="w-10 h-10 text-yellow-600" />}
          title="Clarity"
          description="Clear organization and structured workflow"
        />
      </div>

      {/* Features */}
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600 mt-1" />
            <span>
              <strong>Full Task Management:</strong> Add, edit, delete, and
              complete tasks effortlessly
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600 mt-1" />
            <span>
              <strong>Priority Levels:</strong> Assign High, Medium, or Low
              priority
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600 mt-1" />
            <span>
              <strong>Advanced Filtering:</strong> Focus on what matters most
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600 mt-1" />
            <span>
              <strong>Dynamic Search:</strong> Find tasks in real time
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600 mt-1" />
            <span>
              <strong>Local Storage:</strong> Data stored securely in the browser
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default About;
