package com.delivery.observer;

import com.delivery.model.Pedido;

public class RestauranteObservador implements Observador {
    @Override
    public void actualizar(Pedido pedido) {
        System.out.println("🍽️ Notificación al Restaurante:");
        System.out.println("Nuevo pedido o cambio de estado: " + pedido.getEstado());
        System.out.println("Cliente: " + pedido.getCliente().getNombre());
        System.out.println("Items: " + pedido.getItems().size());
    }
}