import React from 'react';
import { Feather } from '@expo/vector-icons';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {  
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;//Terminar isso depois de pegar os dados corretos!!!
    const message = `Olá APAD, estou entrando em contado para ajudar no caso sobre ${incident.title}, com  o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}.`;
    //Colocar o nome da ong do banco!!
    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['sandro_pauloco@hotmail.com'],//Colocar o email do banco!!!
            body: message
        })
    }

    function sendWhatsApp(){           //Colocar número do whats do banco!!!
        Linking.openURL(`whatsapp://send?phone=5545991039812&text=${message}`)
    }
    
    return(
        <View style={styles.contaeiner}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, {marginTop: 0 }]}>ONG:</Text>
                    <Text style={styles.incidentValue}>Verificar o back-and depois para colocar o name, e tambem a cidade e o estado</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                    <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendEmail}>
                    <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}