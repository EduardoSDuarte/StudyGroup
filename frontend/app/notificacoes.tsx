import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Notificações ainda são mockadas — integração real dependeria de FCM token
// salvo no backend/Firestore. Por ora, exibe histórico visual estático.
const notificacoesMock = [
  { id: 1, titulo: "📞 Ligação iniciada", descricao: "Pietra iniciou uma chamada no grupo." },
  { id: 2, titulo: "📝 Novo resumo", descricao: "João adicionou um resumo de Grafos." },
  { id: 3, titulo: "📅 Novo lembrete", descricao: "Prova de IA amanhã às 19h." },
  { id: 4, titulo: "👥 Novo membro", descricao: "Maria entrou no grupo." },
];

export default function Notificacoes() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ color: "#4F7CFF", fontSize: 18, fontWeight: "bold" }}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
        Notificações 🔔
      </Text>
      {notificacoesMock.map((notif) => (
        <View key={notif.id} style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>{notif.titulo}</Text>
          <Text style={{ color: "#ccc", marginTop: 5 }}>{notif.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
