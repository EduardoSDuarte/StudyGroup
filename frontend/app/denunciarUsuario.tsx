import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function DenunciarUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDenunciar = async () => {
    if (!nomeUsuario || !motivo) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/report/user", { reportedUser: nomeUsuario, reason: motivo });
      Alert.alert("Sucesso", "Denúncia enviada!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível enviar a denúncia. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
        Denunciar Usuário 🚨
      </Text>
      <TextInput
        placeholder="Nome do usuário"
        placeholderTextColor="#999"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Motivo da denúncia"
        placeholderTextColor="#999"
        multiline
        numberOfLines={5}
        value={motivo}
        onChangeText={setMotivo}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, height: 150, textAlignVertical: "top", marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={handleDenunciar}
        disabled={loading}
        style={{ backgroundColor: "#E74C3C", padding: 15, borderRadius: 12 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Enviar Denúncia</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}