package com.delivery.model;

public abstract class Producto {
    protected String nombre;
    protected double precioBase;

    public Producto(String nombre, double precioBase) {
        this.nombre = nombre;
        this.precioBase = precioBase;
    }

    public abstract double getPrecio();
    public abstract String getDescripcion();

    // Getters
    public String getNombre() { return nombre; }
    public double getPrecioBase() { return precioBase; }
}