import React from 'react';
import PropTypes from 'prop-types';
import { Pencil, Trash2 } from 'lucide-react';

const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
};

const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-purple-100 text-purple-800',
};

export function TaskCard({ task, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 mb-4">{task.description}</p>

            <div className="flex items-center space-x-2">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]
                        }`}
                >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]
                        }`}
                >
                    {task.status
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </span>
                <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['todo', 'in-progress', 'completed']).isRequired,
        priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};