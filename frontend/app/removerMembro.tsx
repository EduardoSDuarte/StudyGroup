import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function RemoverMembro() {
  const [membros, setMembros] = useState<any[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [removendo, setRemovendо] = useState(false);

  useEffect(() => {
    carregarMembros();
  }, []);

  const carregarMembros = async () => {
    setLoading(true);
    try {
      const res = await api.get("/group/members");
      setMembros(res.data);
    } catch (error) {
      setMembros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemover = async () => {
    if (!selecionado) {
      Alert.alert("Erro", "Selecione um membro para remover!");
      return;
    }
    Alert.alert(
      "Confirmar remoção",
      "Tem certeza que deseja remover este membro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            setRemovendо(true);
            try {
              await api.delete("/group/remove-user", { data: { userIdToRemove: selecionado } });
              Alert.alert("Sucesso", "Membro removido!", [
                { text: "OK", onPress: () => router.back() }
              ]);
            } catch (error: any) {
              Alert.alert("Erro", "Não foi possível remover o membro. Tente novamente!");
            } finally {
              setRemovendо(false);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>
        Remover Membro ❌
      </Text>
      <Text style={{ color: "#ccc", marginBottom: 20 }}>
        Selecione o membro que deseja remover do grupo.
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : membros.length > 0 ? (
        membros.map((membro: any) => (
          <TouchableOpacity
            key={membro.id}
            onPress={() => setSelecionado(membro.id)}
            style={{
              backgroundColor: selecionado === membro.id ? "#2D4A9F" : "#1D2F6F",
              padding: 20,
              borderRadius: 15,
              marginBottom: 15,
              borderWidth: selecionado === membro.id ? 2 : 0,
              borderColor: "#4F7CFF"
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>👤 {membro.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <>
          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18 }}>👤 Nique</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18 }}>👤 João</Text>
          </View>
        </>
      )}

      <TouchableOpacity
        onPress={handleRemover}
        disabled={removendo}
        style={{ backgroundColor: "#E74C3C", padding: 15, borderRadius: 12, marginTop: 10 }}
      >
        {removendo ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Remover Selecionado</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}