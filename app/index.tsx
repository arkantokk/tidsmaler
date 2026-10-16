import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';
import { newTimer } from '../utils/TimerUtils';

type TimerData = {
  id: string;
  title: string;
  project: string;
  elapsed: number;
  isRunning: boolean;
  startedAt?: number;
};

export default function App() {
  const [timers, setTimers] = useState<TimerData[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const createTimer = ({ title, project }: Pick<TimerData, 'title' | 'project'>) => {
    const timer = newTimer({ title, project });
    setTimers((currentTimers) => [...currentTimers, timer]);
  };

  const toggleTimer = (id: string) => {
    const timestamp = Date.now();
    setTimers((currentTimers) => currentTimers.map((timer) => {
      if (timer.id !== id) return timer;

      if (timer.isRunning) {
        return {
          ...timer,
          elapsed: timer.elapsed + timestamp - (timer.startedAt ?? timestamp),
          isRunning: false,
          startedAt: undefined,
        };
      }

      return { ...timer, isRunning: true, startedAt: timestamp };
    }));
  };

  const deleteTimer = (id: string) => {
    setTimers((currentTimers) => currentTimers.filter((timer) => timer.id !== id));
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tidsmålere</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onCreateTimer={createTimer} />
        {timers.map((timer) => (
          <EditableTimer
            key={timer.id}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            elapsed={timer.elapsed}
            isRunning={timer.isRunning}
            startedAt={timer.startedAt}
            now={now}
            onToggle={() => toggleTimer(timer.id)}
            onDelete={() => deleteTimer(timer.id)}
            editFormOpen={false}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    timerList: {
    paddingBottom: 15,
  },  
});
