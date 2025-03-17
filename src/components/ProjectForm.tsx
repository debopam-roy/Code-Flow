import { useState } from 'react';
import ProjectBubble from './ProjectBubble';
import StackCard from './StackCard';

const ProjectForm = ({
    project_submit,
    isSaving,
}: {
    project_submit: (selectedStack: string) => void;
    isSaving: boolean;
}) => {
    const [selectedType, setSelectedType] = useState<
        'All' | 'Frontend' | 'Backend' | 'Others'
    >('All');
    const [selectedStack, setSelectedStack] = useState<string>('blank'); // Default to 'blank'

    const projectTypes = ['All', 'Frontend', 'Backend', 'Others'];

    const techstacks: {
        Frontend: {
            key: string;
            name: string;
            icon: string;
            description: string;
        }[];
        Backend: {
            key: string;
            name: string;
            icon: string;
            description: string;
        }[];
        Others: {
            key: string;
            name: string;
            icon: string;
            description: string;
        }[];
    } = {
        Frontend: [
            {
                key: 'react',
                name: 'React (JS)',
                icon: '/assets/icons/react.png',
                description: 'A JavaScript library for building UIs.',
            },
            {
                key: 'react_ts',
                name: 'React (TS)',
                icon: '/assets/icons/react.png',
                description: 'React with TypeScript for better type safety.',
            },
            {
                key: 'vite_js',
                name: 'Vite (JS)',
                icon: '/assets/icons/vite.png',
                description:
                    'A fast development server for modern web projects.',
            },
            {
                key: 'vite_ts',
                name: 'Vite (TS)',
                icon: '/assets/icons/vite.png',
                description:
                    'Vite with TypeScript support for scalable applications.',
            },
            {
                key: 'angular',
                name: 'Angular',
                icon: '/assets/icons/angular.png',
                description: 'A TypeScript-based scalable framework.',
            },
            {
                key: 'nextjs',
                name: 'Next.js',
                icon: '/assets/icons/nextjs.png',
                description:
                    'React framework with SSR & static site generation.',
            },
            {
                key: 'html',
                name: 'HTML + CSS',
                icon: '/assets/icons/html.png',
                description: 'Standard markup & styles for web development.',
            },
        ],
        Backend: [
            {
                key: 'nodejs',
                name: 'Node.js',
                icon: '/assets/icons/nodejs.png',
                description: 'Runtime for building scalable server-side apps.',
            },
            {
                key: 'nestjs',
                name: 'NestJS',
                icon: '/assets/icons/nestjs.png',
                description: 'Progressive Node.js framework for scalability.',
            },
            {
                key: 'django',
                name: 'Django',
                icon: '/assets/icons/django.png',
                description: 'Python framework for robust web applications.',
            },
        ],
        Others: [
            {
                key: 'docker',
                name: 'Docker',
                icon: '/assets/icons/docker.png',
                description: 'Containerization platform for deployment.',
            },
            {
                key: 'blank',
                name: 'Blank Project',
                icon: '/assets/icons/blank.png',
                description: 'An empty project setup for full customization.',
            },
        ],
    };

    const getFilteredStacks = () => {
        if (selectedType === 'All') return Object.values(techstacks).flat();
        return techstacks[selectedType] || [];
    };

    const onSelect = (key: string) => {
        setSelectedStack(key); // Set the selected stack key
    };

    return (
        <div className="h-full flex flex-col items-center justify-center mx-4 md:mx-2">
            <div className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg w-full max-w-3xl">
                <div className="text-left space-y-4">
                    <p className="font-semibold text-suggestionColor-light text-lg dark:text-suggestionColor-dark">
                        Select your desired framework
                    </p>
                    <div className="flex flex-row space-x-2">
                        {projectTypes.map((p_type) => (
                            <ProjectBubble
                                key={p_type}
                                name={p_type}
                                selected={selectedType === p_type}
                                onClick={() =>
                                    setSelectedType(
                                        p_type as
                                            | 'All'
                                            | 'Frontend'
                                            | 'Backend'
                                            | 'Others'
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {getFilteredStacks().map((stack) => (
                            <StackCard
                                key={stack.key}
                                val={stack.key}
                                name={stack.name}
                                icon={stack.icon}
                                description={stack.description}
                                isSelected={selectedStack === stack.key}
                                onClick={onSelect}
                            />
                        ))}
                    </div>
                    <div className="space-x-4 flex flex-row justify-end">
                        <button
                            className={`bg-buttonColor-light dark:bg-buttonColor-dark text-highlightColor-light dark:text-highlightColor-light py-2 px-8 rounded-lg focus:outline-none font-bold ${
                                isSaving ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => project_submit(selectedStack)}
                            disabled={isSaving}
                        >
                            {isSaving ? 'SAVING...' : 'SAVE'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
