package com.delivery.singleton;

import com.delivery.model.Pedido;
import java.util.ArrayList;
import java.util.List;

public class Estadisticas {
    private static Estadisticas instancia;
    private List<Pedido> pedidosCompletados;
    private double ingresosTotales;

    private Estadisticas() {
        this.pedidosCompletados = new ArrayList<>();
        this.ingresosTotales = 0.0;
    }

    public static Estadisticas getInstancia() {
        if (instancia == null) {
            instancia = new Estadisticas();
        }
        return instancia;
    }

    public void registrarPedidoCompletado(Pedido pedido) {
        if (pedido.getEstado() == Pedido.Estado.ENTREGADO) {
            pedidosCompletados.add(pedido);
            ingresosTotales += pedido.getTotal();
        }
    }

    public int getTotalPedidos() {
        return pedidosCompletados.size();
    }

    public double getIngresosTotales() {
        return ingresosTotales;
    }

    public double getPromedioPorPedido() {
        if (pedidosCompletados.isEmpty()) {
            return 0.0;
        }
        return ingresosTotales / pedidosCompletados.size();
    }

    public void mostrarEstadisticas() {
        System.out.println("\n📊 Estadísticas del Sistema:");
        System.out.println("Total de pedidos completados: " + getTotalPedidos());
        System.out.println("Ingresos totales: $" + String.format("%.2f", getIngresosTotales()));
        System.out.println("Promedio por pedido: $" + String.format("%.2f", getPromedioPorPedido()));
    }
}