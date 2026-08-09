'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PIZZA_ITEMS } from '@/data/mockData';
import { DollarSign, ShoppingBag, Clock, TrendingUp, AlertTriangle, CheckCircle2, Sliders, Plus, Trash2, Edit3, Bike, BarChart3, Package } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'inventory' | 'delivery'>('overview');

  // Interactive sample state for orders management
  const [ordersList, setOrdersList] = useState([
    { id: 'TUB-849201', customer: 'Anand Kumar', items: 'Tub Supreme x1, Garlic Sticks x1', amount: 698, status: 'Preparing', time: '12 mins ago' },
    { id: 'TUB-849202', customer: 'Priya Sharma', items: 'Fire Chicken x2, Craft Soda x2', amount: 1116, status: 'New', time: '4 mins ago' },
    { id: 'TUB-849203', customer: 'Rahul Verma', items: 'Quattro Cheese x1', amount: 429, status: 'Out for Delivery', time: '22 mins ago' },
    { id: 'TUB-849204', customer: 'Meera Nair', items: 'Peri Peri Paneer x1, Choco Lava x1', amount: 568, status: 'Delivered', time: '45 mins ago' },
  ]);

  // Inventory state
  const [inventoryList, setInventoryList] = useState([
    { item: '72-Hr Sourdough Balls', category: 'Dough', stock: 140, unit: 'units', isLow: false },
    { item: 'Whole Milk Mozzarella', category: 'Cheese', stock: 18, unit: 'kg', isLow: true },
    { item: 'San Marzano Sauce', category: 'Sauce', stock: 45, unit: 'liters', isLow: false },
    { item: 'Smoked Pepperoni', category: 'Topping', stock: 8, unit: 'kg', isLow: true },
    { item: 'Habanero Glaze', category: 'Sauce', stock: 12, unit: 'liters', isLow: false },
  ]);

  // Menu Items State
  const [menuItems, setMenuItems] = useState(PIZZA_ITEMS);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestSeller: !p.isBestSeller } : p))
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Admin Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold text-brand-orange mb-3">
              <Sliders className="w-3.5 h-3.5 text-brand-red" />
              <span>Restaurant Management Console</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Pizza Tub <span className="text-brand-red">Admin Dashboard.</span>
            </h1>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-extrabold text-xs">
            ● Kitchen Live Sync Connected
          </span>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-brand-border">
            <span className="text-[10px] text-brand-muted uppercase font-semibold block">Today Revenue</span>
            <div className="font-display font-black text-2xl text-white mt-1">₹42,890</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">↑ +18% vs yesterday</span>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-brand-border">
            <span className="text-[10px] text-brand-muted uppercase font-semibold block">Total Orders</span>
            <div className="font-display font-black text-2xl text-white mt-1">84</div>
            <span className="text-[10px] text-brand-orange font-bold mt-1 block">12 active now</span>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-brand-border">
            <span className="text-[10px] text-brand-muted uppercase font-semibold block">Avg Delivery Time</span>
            <div className="font-display font-black text-2xl text-white mt-1">24.2 Mins</div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Within 30m SLA</span>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-brand-border">
            <span className="text-[10px] text-brand-muted uppercase font-semibold block">Average Order Value</span>
            <div className="font-display font-black text-2xl text-white mt-1">₹510</div>
            <span className="text-[10px] text-brand-muted mt-1 block">Combos driving AOV</span>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-brand-border col-span-2 lg:col-span-1">
            <span className="text-[10px] text-brand-muted uppercase font-semibold block">Inventory Alerts</span>
            <div className="font-display font-black text-2xl text-brand-red mt-1">2 Low Stock</div>
            <span className="text-[10px] text-brand-red font-bold mt-1 block">Mozzarella & Pepperoni</span>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-brand-border mb-8 overflow-x-auto no-scrollbar gap-6">
          {[
            { id: 'overview', label: 'Order Kanban', icon: ShoppingBag },
            { id: 'menu', label: 'Menu CRUD Manager', icon: Sliders },
            { id: 'inventory', label: 'Stock & Inventory', icon: Package },
            { id: 'delivery', label: 'Rider Fleet Tracker', icon: Bike },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  isActive ? 'border-brand-red text-brand-red' : 'border-transparent text-brand-muted hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Order Kanban */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white mb-4">Live Kitchen Order Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['New', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => {
                const columnOrders = ordersList.filter((o) => o.status === status);

                return (
                  <div key={status} className="glass-card rounded-2xl p-4 border border-brand-border space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                      <span className="font-display font-bold text-xs uppercase text-brand-cream">{status}</span>
                      <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-bold flex items-center justify-center">
                        {columnOrders.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {columnOrders.map((ord) => (
                        <div key={ord.id} className="p-3 rounded-xl bg-brand-surface border border-brand-border space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-brand-orange">{ord.id}</span>
                            <span className="text-[10px] text-brand-muted">{ord.time}</span>
                          </div>
                          <p className="font-bold text-white">{ord.customer}</p>
                          <p className="text-[11px] text-brand-muted">{ord.items}</p>
                          <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
                            <span className="font-bold text-white">₹{ord.amount}</span>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="bg-black/60 border border-brand-border rounded px-2 py-1 text-[10px] text-white focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Menu CRUD Manager */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-white">Menu Item Availability & Pricing</h3>
              <button className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold uppercase shadow-glow flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-4 border border-brand-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-xs font-semibold text-brand-orange">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase border transition-all ${
                        item.isBestSeller
                          ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                          : 'bg-brand-surface border-brand-border text-brand-muted'
                      }`}
                    >
                      {item.isBestSeller ? 'Available' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Ingredient Inventory Tracker</h3>
            <div className="glass-panel rounded-2xl border border-brand-border overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-surface border-b border-brand-border text-brand-muted uppercase">
                  <tr>
                    <th className="p-4">Ingredient</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {inventoryList.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="p-4 font-bold text-white">{inv.item}</td>
                      <td className="p-4 text-brand-muted">{inv.category}</td>
                      <td className="p-4 font-mono font-bold text-white">{inv.stock} {inv.unit}</td>
                      <td className="p-4">
                        {inv.isLow ? (
                          <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-800 text-brand-red font-bold text-[10px] uppercase flex items-center gap-1 w-max">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] uppercase w-max block">
                            Optimal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
