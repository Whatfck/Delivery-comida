package com.delivery.observer;

import com.delivery.model.Pedido;

public interface Observador {
    void actualizar(Pedido pedido);
}