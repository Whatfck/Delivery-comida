package com.delivery.observer;

import com.delivery.model.Pedido;

public class ClienteObservador implements Observador {
    private String nombre;

    public ClienteObservador(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public void actualizar(Pedido pedido) {
        System.out.println("🔔 Notificación para " + nombre + ":");
        System.out.println("Su pedido cambió al estado: " + pedido.getEstado());
        System.out.println("Total del pedido: $" + String.format("%.2f", pedido.getTotal()));
    }
}