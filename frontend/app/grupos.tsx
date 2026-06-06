import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../services/api";
import { groupContext } from "../services/groupContext";

export default function Grupos() {
  const [grupos, setGrupos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarGrupos();
  }, []);

  const carregarGrupos = async () => {
    setLoading(true);
    try {
      // ✅ Endpoint correto para listar grupos do usuário logado
      const res = await api.get("/group/my-groups");
      setGrupos(res.data);
    } catch (error) {
      setGrupos([]);
    } finally {
      setLoading(false);
    }
  };

  const abrirGrupo = (grupo: any) => {
    // ✅ Salva o groupId e nome antes de navegar — todas as telas internas vão usar isso
    groupContext.set(grupo.id, grupo.name);
    router.push("/grupo");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B1E4D" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginTop: 50, marginBottom: 30 }}>
        Meus Grupos 📚
      </Text>

      {loading ? (
        <ActivityIndicator color="#4F7CFF" size="large" />
      ) : grupos.length > 0 ? (
        grupos.map((grupo: any) => (
          <TouchableOpacity
            key={grupo.id}
            onPress={() => abrirGrupo(grupo)}
            style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{grupo.name}</Text>
            <Text style={{ color: "#ccc", marginTop: 5 }}>{grupo.memberCount ?? "?"} membros</Text>
          </TouchableOpacity>
        ))
      ) : (
        // Fallback mockado — aparece só se a API não retornar nada
        <TouchableOpacity
          onPress={() => {
            groupContext.set("mock-id-123", "Os Feras");
            router.push("/grupo");
          }}
          style={{ backgroundColor: "#1D2F6F", padding: 20, borderRadius: 15, marginBottom: 15 }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Os Feras</Text>
          <Text style={{ color: "#ccc", marginTop: 5 }}>4 membros</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => router.push("/novoGrupo")}
        style={{ backgroundColor: "#4F7CFF", padding: 20, borderRadius: 15, marginBottom: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>+ Criar Grupo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/entrarGrupo")}
        style={{ borderWidth: 1, borderColor: "#4F7CFF", borderStyle: "dashed", padding: 20, borderRadius: 15 }}
      >
        <Text style={{ color: "#4F7CFF", textAlign: "center", fontWeight: "bold" }}>+ Entrar em Grupo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
