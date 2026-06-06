import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { groupContext } from "../services/groupContext";
import { listarMembros, transferirAdmin } from "../services/groupService";

export default function TransferirAdm() {
  const [membros, setMembros] = useState<any[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [transferindo, setTransferindo] = useState(false);

  useEffect(() => {
    carregarMembros();
  }, []);

  const carregarMembros = async () => {
    setLoading(true);
    try {
      // ✅ Usa o service com o groupId correto
      const dados = await listarMembros(groupContext.groupId);
      setMembros(dados);
    } catch (error) {
      setMembros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferir = async () => {
    if (!selecionado) {
      Alert.alert("Erro", "Selecione um membro para transferir a administração!");
      return;
    }
    Alert.alert(
      "Confirmar transferência",
      "Tem certeza? Você perderá os privilégios de administrador!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Transferir",
          style: "destructive",
          onPress: async () => {
            setTransferindo(true);
            try {
              // ✅ groupId e newAdminId enviados corretamente
              await transferirAdmin(groupContext.groupId, selecionado);
              Alert.alert("Sucesso", "Administração transferida!", [
                { text: "OK", onPress: () => router.push("/grupos") }
              ]);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível transferir. Tente novamente!");
            } finally {
              setTransferindo(false);
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
        Transferir Administração 👑
      </Text>
      <Text style={{ color: "#ccc", marginBottom: 20 }}>
        Escolha o novo administrador do grupo.
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
        // Fallback mockado
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
        onPress={handleTransferir}
        disabled={transferindo}
        style={{ backgroundColor: "#F39C12", padding: 15, borderRadius: 12, marginTop: 10 }}
      >
        {transferindo ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Transferir Administração</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
