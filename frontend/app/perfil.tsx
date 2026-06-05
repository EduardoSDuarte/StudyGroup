import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { auth } from "../services/firebase";
import api from "../services/api";

export default function Perfil() {
  const [perfil, setPerfil] = useState<any>(null);
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      setPerfil({ nome: user?.displayName || "Usuário", email: user?.email });
      const res = await api.get("/ranking");
      setRanking(res.data);
    } catch (error) {
      setPerfil(null);
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
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 25 }}>
        Perfil 👤
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : (
        <>
          <View style={{ backgroundColor: "#1D2F6F", padding: 25, borderRadius: 15, marginBottom: 20 }}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              {perfil?.nome || "Pietra Bezerra"}
            </Text>
            <Text style={{ color: "#ccc", marginTop: 8 }}>
              {perfil?.email || "pietra@email.com"}
            </Text>
          </View>

          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>⏱️ Horas estudadas este mês</Text>
            <Text style={{ color: "#4F7CFF", fontSize: 22, marginTop: 10 }}>48h 32min</Text>
          </View>

          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>🏆 Melhor posição</Text>
            <Text style={{ color: "#FFD700", fontSize: 22, marginTop: 10 }}>1º Lugar</Text>
          </View>

          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 25 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>📈 Histórico de Ranking</Text>
            {ranking.length > 0 ? (
              ranking.map((item: any, index: number) => (
                <Text key={index} style={{ color: "#ccc", marginTop: 10 }}>
                  {item.month} - {item.position}º Lugar
                </Text>
              ))
            ) : (
              <>
                <Text style={{ color: "#ccc", marginTop: 10 }}>Maio/2026 - 2º Lugar</Text>
                <Text style={{ color: "#ccc", marginTop: 5 }}>Junho/2026 - 1º Lugar</Text>
              </>
            )}
          </View>
        </>
      )}

      <TouchableOpacity
        onPress={() => router.push("/editarPerfil")}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12, marginBottom: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/excluirConta")}
        style={{ backgroundColor: "#E74C3C", padding: 15, borderRadius: 12 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>🗑️ Excluir Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}