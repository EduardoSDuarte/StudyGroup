import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function EditarGrupo() {
  const [nome, setNome] = useState("Os Feras");
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome) {
      Alert.alert("Erro", "Digite o nome do grupo!");
      return;
    }
    setLoading(true);
    try {
      await api.put("/group/update", { name: nome });
      Alert.alert("Sucesso", "Grupo atualizado!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível atualizar o grupo. Tente novamente!");
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
        Editar Grupo ✏️
      </Text>
      <TextInput
        placeholder="Nome do Grupo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={handleSalvar}
        disabled={loading}
        style={{ backgroundColor: "#F39C12", padding: 15, borderRadius: 12 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}