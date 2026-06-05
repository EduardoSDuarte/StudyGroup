import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    carregarComentarios();
  }, []);

  const carregarComentarios = async () => {
    setLoading(true);
    try {
      const res = await api.get("/summary/list");
      setComentarios(res.data);
    } catch (error) {
      setComentarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleComentar = async () => {
    if (!novoComentario) {
      Alert.alert("Erro", "Digite um comentário!");
      return;
    }
    setEnviando(true);
    try {
      await api.post("/summary/comment", { content: novoComentario });
      setNovoComentario("");
      carregarComentarios();
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível enviar o comentário. Tente novamente!");
    } finally {
      setEnviando(false);
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
        Comentários 💬
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : comentarios.length > 0 ? (
        comentarios.map((comentario: any) => (
          <View key={comentario.id} style={{ backgroundColor: "#1D2F6F", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>{comentario.authorName}</Text>
            <Text style={{ color: "#ccc", marginTop: 5 }}>{comentario.content}</Text>
          </View>
        ))
      ) : (
        <>
          <View style={{ backgroundColor: "#1D2F6F", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>João</Text>
            <Text style={{ color: "#ccc", marginTop: 5 }}>Excelente resumo!</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Pietra</Text>
            <Text style={{ color: "#ccc", marginTop: 5 }}>Gostei da explicação sobre vértices.</Text>
          </View>
        </>
      )}

      <TextInput
        placeholder="Adicionar comentário"
        placeholderTextColor="#999"
        value={novoComentario}
        onChangeText={setNovoComentario}
        style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 15, marginTop: 10 }}
      />
      <TouchableOpacity
        onPress={handleComentar}
        disabled={enviando}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12 }}
      >
        {enviando ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Comentar</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}