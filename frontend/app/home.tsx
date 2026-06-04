import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    let intervalo: any;

    if (rodando) {
      intervalo = setInterval(() => {
        setTempo((valorAnterior) => valorAnterior + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [rodando]);

  const horas = String(Math.floor(tempo / 3600)).padStart(2, "0");
  const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
        padding: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Cronômetro ⏱️
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 20,
          padding: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {horas}:{minutos}:{segundos}
        </Text>

        <TouchableOpacity
          onPress={() => setRodando(!rodando)}
          style={{
            backgroundColor: "#4F7CFF",
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {rodando ? "Pausar" : "Iniciar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTempo(0);
            setRodando(false);
          }}
          style={{
            backgroundColor: "#E74C3C",
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Resetar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
