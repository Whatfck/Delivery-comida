package com.delivery.model;

import com.delivery.observer.Sujeto;
import java.util.ArrayList;
import java.util.List;

public class Pedido extends Sujeto {
    public enum Estado {
        RECIBIDO, PREPARANDO, LISTO, EN_CAMINO, ENTREGADO
    }

    private Cliente cliente;
    private Restaurante restaurante;
    private List<Producto> items;
    private Estado estado;
    private double total;

    public Pedido(Cliente cliente, Restaurante restaurante) {
        this.cliente = cliente;
        this.restaurante = restaurante;
        this.items = new ArrayList<>();
        this.estado = Estado.RECIBIDO;
        this.total = 0.0;
    }

    public void agregarItem(Producto item) {
        items.add(item);
        calcularTotal();
    }

    public void calcularTotal() {
        this.total = items.stream()
                         .mapToDouble(Producto::getPrecio)
                         .sum();
    }

    public String verResumen() {
        StringBuilder resumen = new StringBuilder();
        resumen.append(String.format("Pedido para %s:\n", cliente.getNombre()));
        for (Producto item : items) {
            resumen.append(String.format("- %s: $%.2f\n",
                                       item.getDescripcion(),
                                       item.getPrecio()));
        }
        resumen.append(String.format("Total: $%.2f", total));
        return resumen.toString();
    }

    public String confirmar() {
        cambiarEstado(Estado.PREPARANDO);
        return "Pedido confirmado. " + verResumen();
    }

    public void cambiarEstado(Estado nuevoEstado) {
        this.estado = nuevoEstado;
        notificarObservadores();
    }

    // Getters
    public Cliente getCliente() { return cliente; }
    public Restaurante getRestaurante() { return restaurante; }
    public List<Producto> getItems() { return items; }
    public Estado getEstado() { return estado; }
    public double getTotal() { return total; }
}