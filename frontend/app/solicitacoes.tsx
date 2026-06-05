import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const carregarSolicitacoes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/group/solicitacoes");
      setSolicitacoes(res.data);
    } catch (error) {
      setSolicitacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAceitar = async (id: string) => {
    try {
      await api.post("/group/join", { requestId: id });
      Alert.alert("Sucesso", "Solicitação aceita!");
      carregarSolicitacoes();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível aceitar. Tente novamente!");
    }
  };

  const handleRecusar = async (id: string) => {
    try {
      await api.post("/group/leave", { requestId: id });
      Alert.alert("Sucesso", "Solicitação recusada!");
      carregarSolicitacoes();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível recusar. Tente novamente!");
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
        Solicitações 📥
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : solicitacoes.length > 0 ? (
        solicitacoes.map((solicitacao: any) => (
          <View key={solicitacao.id} style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
              {solicitacao.userName}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => handleAceitar(solicitacao.id)}
                style={{ backgroundColor: "#2ECC71", width: "48%", padding: 12, borderRadius: 10 }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRecusar(solicitacao.id)}
                style={{ backgroundColor: "#E74C3C", width: "48%", padding: 12, borderRadius: 10 }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Recusar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>João Silva</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={{ backgroundColor: "#2ECC71", width: "48%", padding: 12, borderRadius: 10 }}>
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#E74C3C", width: "48%", padding: 12, borderRadius: 10 }}>
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Recusar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}