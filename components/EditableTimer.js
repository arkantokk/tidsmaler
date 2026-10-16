import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer'

export default function EditableTimer({
    id,
    title,
    project,
    elapsed,
    isRunning,
    startedAt,
    now,
    onToggle,
    onDelete,
    editFormOpen,
}) {
    if (editFormOpen) {
        return <TimerForm id={id} title={title} project={project} />;
    }
    return (
        <Timer
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            startedAt={startedAt}
            now={now}
            onToggle={onToggle}
            onDelete={onDelete}
        />
    );
}
    