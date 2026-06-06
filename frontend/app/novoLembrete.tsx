import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { groupContext } from "../services/groupContext";
import { criarLembrete } from "../services/reminderService";

export default function NovoLembrete() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!titulo || !data) {
      Alert.alert("Erro", "Preencha o título e a data!");
      return;
    }
    setLoading(true);
    try {
      // ✅ Usa o service, passando o groupId automaticamente
      await criarLembrete(groupContext.groupId, titulo, data);
      Alert.alert("Sucesso", "Lembrete salvo!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o lembrete. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40, flexGrow: 1 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>
        Novo Lembrete 📅
      </Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Data (ex: 10/06/2026)"
        placeholderTextColor="#999"
        value={data}
        onChangeText={setData}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={handleSalvar}
        disabled={loading}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Salvar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
