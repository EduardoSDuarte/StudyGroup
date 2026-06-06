import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { groupContext } from "../services/groupContext";
import { listarRankingMensal } from "../services/rankingService";

export default function RankingMensal() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarRanking();
  }, []);

  const carregarRanking = async () => {
    setLoading(true);
    try {
      // ✅ Endpoint correto: GET /ranking/:groupId
      const dados = await listarRankingMensal(groupContext.groupId);
      setRanking(dados);
    } catch (error) {
      setRanking([]);
    } finally {
      setLoading(false);
    }
  };

  const medalhas = ["🥇", "🥈", "🥉"];
  const cores = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
        Ranking Mensal 📊
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : ranking.length > 0 ? (
        ranking.map((item: any, index: number) => (
          <View key={index} style={{ backgroundColor: "#1D2F6F", borderRadius: 18, padding: 20, marginBottom: 15 }}>
            <Text style={{ color: cores[index] || "white", fontSize: index < 3 ? 22 : 18, fontWeight: "bold" }}>
              {medalhas[index] || `${index + 1}º`} {item.userName}
            </Text>
            <Text style={{ color: "white", marginTop: 8 }}>
              {item.totalHours} horas estudadas
            </Text>
          </View>
        ))
      ) : (
        // Fallback mockado
        <>
          <View style={{ backgroundColor: "#1D2F6F", borderRadius: 18, padding: 20, marginBottom: 15 }}>
            <Text style={{ color: "#FFD700", fontSize: 22, fontWeight: "bold" }}>🥇 Pietra</Text>
            <Text style={{ color: "white", marginTop: 8 }}>72 horas estudadas</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", borderRadius: 18, padding: 20, marginBottom: 15 }}>
            <Text style={{ color: "#C0C0C0", fontSize: 22, fontWeight: "bold" }}>🥈 Nique</Text>
            <Text style={{ color: "white", marginTop: 8 }}>69 horas estudadas</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", borderRadius: 18, padding: 20, marginBottom: 15 }}>
            <Text style={{ color: "#CD7F32", fontSize: 22, fontWeight: "bold" }}>🥉 João</Text>
            <Text style={{ color: "white", marginTop: 8 }}>61 horas estudadas</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", borderRadius: 18, padding: 20 }}>
            <Text style={{ color: "white", fontSize: 18 }}>4º Maria — 54h</Text>
            <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>5º Pedro — 48h</Text>
            <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>6º Ana — 42h</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}
