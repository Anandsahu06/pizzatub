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
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Admin Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
              <Sliders className="w-4 h-4 text-[#E6392F]" />
              <span>RESTAURANT MANAGEMENT CONSOLE</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#242424] tracking-tight">
              Pizza Tub <span className="text-[#E6392F]">Admin Dashboard.</span>
            </h1>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] font-extrabold text-xs">
            ● Kitchen Live Sync Connected
          </span>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE3DA] shadow-card">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold block">Today Revenue</span>
            <div className="font-display font-black text-2xl text-[#242424] mt-1">₹42,890</div>
            <span className="text-[10px] text-[#2E8B57] font-extrabold mt-1 block">↑ +18% vs yesterday</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE3DA] shadow-card">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold block">Total Orders</span>
            <div className="font-display font-black text-2xl text-[#242424] mt-1">84</div>
            <span className="text-[10px] text-[#E6392F] font-extrabold mt-1 block">12 active now</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE3DA] shadow-card">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold block">Avg Delivery Time</span>
            <div className="font-display font-black text-2xl text-[#242424] mt-1">24.2 Mins</div>
            <span className="text-[10px] text-[#2E8B57] font-extrabold mt-1 block">Within 30m SLA</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE3DA] shadow-card">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold block">Average Order Value</span>
            <div className="font-display font-black text-2xl text-[#242424] mt-1">₹510</div>
            <span className="text-[10px] text-[#6B6B6B] font-bold mt-1 block">Combos driving AOV</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE3DA] shadow-card col-span-2 lg:col-span-1">
            <span className="text-[10px] text-[#6B6B6B] uppercase font-bold block">Inventory Alerts</span>
            <div className="font-display font-black text-2xl text-[#E6392F] mt-1">2 Low Stock</div>
            <span className="text-[10px] text-[#E6392F] font-extrabold mt-1 block">Mozzarella & Pepperoni</span>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-[#EAE3DA] mb-8 overflow-x-auto no-scrollbar gap-6">
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
                className={`pb-3 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  isActive ? 'border-[#E6392F] text-[#E6392F]' : 'border-transparent text-[#6B6B6B] hover:text-[#242424]'
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
            <h3 className="font-display font-bold text-xl text-[#242424] mb-4">Live Kitchen Order Management</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['New', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => {
                const columnOrders = ordersList.filter((o) => o.status === status);

                return (
                  <div key={status} className="bg-white rounded-3xl p-4 border border-[#EAE3DA] shadow-card space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#EAE3DA]">
                      <span className="font-display font-extrabold text-xs uppercase text-[#242424]">{status}</span>
                      <span className="w-5 h-5 rounded-full bg-[#FFF1DD] text-[#C92822] text-[10px] font-bold flex items-center justify-center">
                        {columnOrders.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {columnOrders.map((ord) => (
                        <div key={ord.id} className="p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA] space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-black text-[#E6392F]">{ord.id}</span>
                            <span className="text-[10px] text-[#6B6B6B] font-bold">{ord.time}</span>
                          </div>
                          <p className="font-bold text-[#242424]">{ord.customer}</p>
                          <p className="text-[11px] text-[#6B6B6B] font-medium">{ord.items}</p>
                          <div className="pt-2 border-t border-[#EAE3DA] flex items-center justify-between">
                            <span className="font-extrabold text-[#242424]">₹{ord.amount}</span>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="bg-white border border-[#EAE3DA] rounded px-2 py-1 text-[10px] text-[#242424] font-bold focus:outline-none"
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
              <h3 className="font-display font-bold text-xl text-[#242424]">Menu Item Availability & Pricing</h3>
              <button className="px-4 py-2.5 rounded-2xl bg-[#E6392F] text-white text-xs font-extrabold uppercase shadow-md flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-4 border border-[#EAE3DA] shadow-card flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden relative shrink-0 border border-[#EAE3DA]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#242424]">{item.name}</h4>
                      <p className="text-xs font-extrabold text-[#E6392F]">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase border transition-all ${
                        item.isBestSeller
                          ? 'bg-emerald-50 border-[#2E8B57] text-[#2E8B57]'
                          : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#6B6B6B]'
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
            <h3 className="font-display font-bold text-xl text-[#242424]">Ingredient Inventory Tracker</h3>
            <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF8F0] border-b border-[#EAE3DA] text-[#6B6B6B] uppercase font-bold">
                  <tr>
                    <th className="p-4">Ingredient</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3DA]">
                  {inventoryList.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-[#FFF8F0]/50 font-medium">
                      <td className="p-4 font-bold text-[#242424]">{inv.item}</td>
                      <td className="p-4 text-[#6B6B6B]">{inv.category}</td>
                      <td className="p-4 font-mono font-bold text-[#242424]">{inv.stock} {inv.unit}</td>
                      <td className="p-4">
                        {inv.isLow ? (
                          <span className="px-3 py-1 rounded-full bg-red-50 border border-[#E6392F] text-[#E6392F] font-extrabold text-[10px] uppercase flex items-center gap-1 w-max">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] font-extrabold text-[10px] uppercase w-max block">
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
