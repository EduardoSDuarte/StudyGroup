import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import api from "../services/api";
import { groupContext } from "../services/groupContext";

export default function Agenda() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adicionando, setAdicionando] = useState(false);
  const [novoEvento, setNovoEvento] = useState("");
  const [novaData, setNovaData] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    setLoading(true);
    try {
      const groupId = groupContext.groupId;
      // ✅ Endpoint correto com groupId dinâmico
      const res = await api.get(`/reminder/${groupId}`);
      setEventos(res.data);
    } catch (error) {
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionar = async () => {
    if (!novoEvento || !novaData) {
      Alert.alert("Erro", "Preencha o evento e a data!");
      return;
    }
    setAdicionando(true);
    try {
      const groupId = groupContext.groupId;
      await api.post("/reminder/create", {
        title: novoEvento,
        date: novaData,
        groupId, // ✅ Envia o groupId junto ao criar
      });
      setNovoEvento("");
      setNovaData("");
      setMostrarForm(false);
      carregarEventos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o evento. Tente novamente!");
    } finally {
      setAdicionando(false);
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
        Agenda Compartilhada 📅
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : eventos.length > 0 ? (
        eventos.map((evento: any) => (
          <View key={evento.id} style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{evento.title}</Text>
            <Text style={{ color: "#ccc", marginTop: 8 }}>{evento.date}</Text>
          </View>
        ))
      ) : (
        // Fallback mockado
        <>
          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>📚 Entrega Trabalho de Grafos</Text>
            <Text style={{ color: "#ccc", marginTop: 8 }}>10/06/2026 - 23:59</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>🤖 Prova de IA</Text>
            <Text style={{ color: "#ccc", marginTop: 8 }}>15/06/2026 - 19:00</Text>
          </View>
          <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>🎤 Apresentação do Projeto</Text>
            <Text style={{ color: "#ccc", marginTop: 8 }}>20/06/2026 - 08:00</Text>
          </View>
        </>
      )}

      {mostrarForm && (
        <View style={{ marginBottom: 15 }}>
          <TextInput
            placeholder="Nome do evento"
            placeholderTextColor="#999"
            value={novoEvento}
            onChangeText={setNovoEvento}
            style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Data (ex: 10/06/2026 - 19:00)"
            placeholderTextColor="#999"
            value={novaData}
            onChangeText={setNovaData}
            style={{ backgroundColor: "white", borderRadius: 12, padding: 15, marginBottom: 10 }}
          />
          <TouchableOpacity
            onPress={handleAdicionar}
            disabled={adicionando}
            style={{ backgroundColor: "#2ECC71", padding: 15, borderRadius: 12 }}
          >
            {adicionando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Salvar Evento</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setMostrarForm(!mostrarForm)}
        style={{ backgroundColor: "#4F7CFF", padding: 15, borderRadius: 12 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          {mostrarForm ? "Cancelar" : "+ Adicionar Evento"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
