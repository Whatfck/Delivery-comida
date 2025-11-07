package com.delivery.observer;

import com.delivery.model.Pedido;

public class RepartidorObservador implements Observador {
    @Override
    public void actualizar(Pedido pedido) {
        if (pedido.getEstado() == Pedido.Estado.LISTO ||
            pedido.getEstado() == Pedido.Estado.EN_CAMINO ||
            pedido.getEstado() == Pedido.Estado.ENTREGADO) {

            System.out.println("🚚 Notificación al Repartidor:");
            System.out.println("Estado del pedido: " + pedido.getEstado());
            System.out.println("Dirección de entrega: " + pedido.getCliente().getDireccion());
            System.out.println("Teléfono del cliente: " + pedido.getCliente().getTelefono());
        }
    }
}