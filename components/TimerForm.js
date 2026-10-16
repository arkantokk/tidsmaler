import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import TimerButton from './TimerButton';

export default function TimerForm({ id, title, project, onSubmit, onCancel }) {
    const [timerTitle, setTimerTitle] = useState(title || '');
    const [timerProject, setTimerProject] = useState(project || '');
    const submitText = id ? 'Oppdater' : 'Opprett';

    const handleSubmit = () => {
        const cleanTitle = timerTitle.trim();
        const cleanProject = timerProject.trim();

        if (!cleanTitle || !cleanProject) {
            return;
        }

        onSubmit({ title: cleanTitle, project: cleanProject });
        onCancel();
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Navn</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        value={timerTitle}
                        onChangeText={setTimerTitle}
                    />
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Kategori</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        value={timerProject}
                        onChangeText={setTimerProject}
                    />
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton small color="#21BA45" title={submitText} toggleChange={handleSubmit} />
                <TimerButton small color="#DB2828" title="Avbryt" toggleChange={onCancel} />
            </View>
        </View>
    );
}
       
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D7DA',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});