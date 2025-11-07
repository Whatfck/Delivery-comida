package com.delivery.model;

public class Cliente {
    private String nombre;
    private String telefono;
    private String direccion;

    public Cliente(String nombre, String telefono, String direccion) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    // Getters
    public String getNombre() { return nombre; }
    public String getTelefono() { return telefono; }
    public String getDireccion() { return direccion; }

    @Override
    public String toString() {
        return String.format("Cliente: %s, Tel: %s, Dir: %s",
                           nombre, telefono, direccion);
    }
}