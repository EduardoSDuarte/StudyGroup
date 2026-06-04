import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function EntrarGrupo() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEntrar = async () => {
    if (!codigo) {
      Alert.alert("Erro", "Digite o código do convite!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/group/join-invite", { inviteCode: codigo });
      Alert.alert("Sucesso", "Solicitação enviada! Aguarde o administrador aprovar.", [
        { text: "OK", onPress: () => router.push("/grupos") }
      ]);
    } catch (error: any) {
      Alert.alert("Erro", "Código inválido ou expirado. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40, flexGrow: 1, justifyContent: "center" }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 30 }}>
        Entrar em Grupo 🔑
      </Text>
      <TextInput
        placeholder="Código do Convite"
        placeholderTextColor="#999"
        value={codigo}
        onChangeText={setCodigo}
        autoCapitalize="none"
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={handleEntrar}
        disabled={loading}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Entrar no Grupo</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}