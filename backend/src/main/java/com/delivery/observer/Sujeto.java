package com.delivery.observer;

import java.util.ArrayList;
import java.util.List;

public abstract class Sujeto {
    protected List<Observador> observadores = new ArrayList<>();

    public void agregarObservador(Observador observador) {
        observadores.add(observador);
    }

    public void eliminarObservador(Observador observador) {
        observadores.remove(observador);
    }

    public void notificarObservadores() {
        for (Observador observador : observadores) {
            observador.actualizar((com.delivery.model.Pedido) this);
        }
    }
}