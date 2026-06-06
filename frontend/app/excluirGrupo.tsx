import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { groupContext } from "../services/groupContext";
import { excluirGrupo } from "../services/groupService";

export default function ExcluirGrupo() {
  const [loading, setLoading] = useState(false);

  const handleExcluir = async () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza? Essa ação não pode ser desfeita!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              // ✅ Endpoint correto com groupId — antes usava /group/remove-user (errado!)
              await excluirGrupo(groupContext.groupId);
              groupContext.clear();
              Alert.alert("Sucesso", "Grupo excluído!", [
                { text: "OK", onPress: () => router.push("/grupos") }
              ]);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o grupo. Tente novamente!");
            } finally {
              setLoading(false);
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
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginBottom: 25 }}>
        Excluir Grupo 🗑️
      </Text>
      <View style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 25 }}>
        <Text style={{ color: "#ccc", lineHeight: 24 }}>
          Esta ação removerá permanentemente o grupo e todas as suas informações.
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleExcluir}
        disabled={loading}
        style={{ backgroundColor: "#E74C3C", padding: 15, borderRadius: 12 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Confirmar Exclusão</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
