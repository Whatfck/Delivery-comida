package com.delivery.decorator;

import com.delivery.model.Producto;

public class ExtraQueso extends ProductoDecorator {
    public ExtraQueso(Producto productoDecorado) {
        super(productoDecorado, "extra queso", 2.50);
    }

    @Override
    public double getPrecio() {
        return productoDecorado.getPrecio() + 2.50;
    }

    @Override
    public String getDescripcion() {
        return productoDecorado.getDescripcion() + " + extra queso";
    }
}