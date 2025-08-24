import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Eye,
  RotateCcw,
  Calendar,
  MapPin,
  Phone,
  Star,
  Filter,
  Search,
  User,
} from "lucide-react";
import { ProductImage } from "../../features/images";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  trackingNumber?: string;
}

const OrdersPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock orders data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "1",
        orderNumber: "ZS-2025-001",
        date: "2025-01-15T10:30:00Z",
        status: "delivered",
        total: 299,
        items: [
          {
            id: 101,
            name: isRtl ? "باقة ورد أحمر" : "Red Rose Bouquet",
            image:
              "https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg?auto=compress&cs=tinysrgb&w=300",
            price: 199,
            quantity: 1,
          },
          {
            id: 201,
            name: isRtl ? "قلادة سحر فضية" : "Silver Charm Necklace",
            image:
              "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=300",
            price: 100,
            quantity: 1,
          },
        ],
        shippingAddress: {
          name: isRtl ? "أحمد محمد" : "Ahmed Mohamed",
          phone: "+966 50 123 4567",
          address: isRtl
            ? "شارع الملك فهد، الرياض"
            : "King Fahd Street, Riyadh",
          city: isRtl ? "الرياض" : "Riyadh",
        },
        trackingNumber: "ZS123456789",
      },
      {
        id: "2",
        orderNumber: "ZS-2025-002",
        date: "2025-01-18T14:20:00Z",
        status: "shipped",
        total: 449,
        items: [
          {
            id: 501,
            name: isRtl ? "طقم عناية فاخر بالبشرة" : "Luxury Skincare Set",
            image:
              "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300",
            price: 449,
            quantity: 1,
          },
        ],
        shippingAddress: {
          name: isRtl ? "فاطمة علي" : "Fatima Ali",
          phone: "+966 50 765 4321",
          address: isRtl ? "حي النخيل، جدة" : "Al Nakheel District, Jeddah",
          city: isRtl ? "جدة" : "Jeddah",
        },
        trackingNumber: "ZS987654321",
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, [isRtl]);

  const getStatusInfo = (status: Order["status"]) => {
    const statusMap = {
      pending: {
        label: isRtl ? "في الانتظار" : "Pending",
        color: "text-yellow-600 bg-yellow-100",
        icon: <Clock size={16} />,
      },
      processing: {
        label: isRtl ? "قيد المعالجة" : "Processing",
        color: "text-blue-600 bg-blue-100",
        icon: <Package size={16} />,
      },
      shipped: {
        label: isRtl ? "تم الشحن" : "Shipped",
        color: "text-purple-600 bg-purple-100",
        icon: <Truck size={16} />,
      },
      delivered: {
        label: isRtl ? "تم التسليم" : "Delivered",
        color: "text-green-600 bg-green-100",
        icon: <CheckCircle size={16} />,
      },
      cancelled: {
        label: isRtl ? "ملغي" : "Cancelled",
        color: "text-red-600 bg-red-100",
        icon: <RotateCcw size={16} />,
      },
    };
    return statusMap[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isRtl ? "طلباتي" : "My Orders"}
          </h1>
          <p className="text-gray-600">
            {isRtl ? "تتبع وإدارة طلباتك" : "Track and manage your orders"}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={isRtl ? "البحث في الطلبات..." : "Search orders..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">
                  {isRtl ? "جميع الطلبات" : "All Orders"}
                </option>
                <option value="pending">
                  {isRtl ? "في الانتظار" : "Pending"}
                </option>
                <option value="processing">
                  {isRtl ? "قيد المعالجة" : "Processing"}
                </option>
                <option value="shipped">
                  {isRtl ? "تم الشحن" : "Shipped"}
                </option>
                <option value="delivered">
                  {isRtl ? "تم التسليم" : "Delivered"}
                </option>
                <option value="cancelled">
                  {isRtl ? "ملغي" : "Cancelled"}
                </option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isRtl ? "جاري تحميل الطلبات..." : "Loading orders..."}
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {isRtl ? "لا توجد طلبات" : "No Orders Found"}
            </h3>
            <p className="text-gray-600 mb-8">
              {isRtl
                ? "لم تقم بأي طلبات بعد. ابدأ التسوق الآن!"
                : "You haven't placed any orders yet. Start shopping now!"}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-all shadow-lg"
            >
              <Package size={18} />
              <span>{isRtl ? "ابدأ التسوق" : "Start Shopping"}</span>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {isRtl ? "طلب رقم:" : "Order #"} {order.orderNumber}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>
                              {new Date(order.date).toLocaleDateString(
                                isRtl ? "ar-EG" : "en-US"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package size={14} />
                            <span>
                              {order.items.length} {isRtl ? "منتج" : "items"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color}`}
                        >
                          {statusInfo.icon}
                          <span className="font-medium text-sm">
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="text-right rtl:text-left">
                          <div className="text-lg font-bold text-gray-800">
                            {order.total} {isRtl ? "ر.س" : "SAR"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">
                          {isRtl ? "المنتجات" : "Items"}
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3"
                            >
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                width={48}
                                height={48}
                                aspectRatio="square"
                                sizes="48px"
                                quality={75}
                                showZoom={false}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800 text-sm">
                                  {item.name}
                                </h5>
                                <p className="text-gray-600 text-xs">
                                  {item.quantity} × {item.price}{" "}
                                  {isRtl ? "ر.س" : "SAR"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">
                          {isRtl ? "معلومات الشحن" : "Shipping Information"}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-500" />
                            <span>{order.shippingAddress.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-500" />
                            <span>{order.shippingAddress.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-500" />
                            <span>{order.shippingAddress.address}</span>
                          </div>
                          {order.trackingNumber && (
                            <div className="flex items-center gap-2">
                              <Truck size={14} className="text-gray-500" />
                              <span>
                                {isRtl ? "رقم التتبع:" : "Tracking:"}{" "}
                                {order.trackingNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100">
                      <Link
                        to={`/order/${order.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all shadow-md"
                      >
                        <Eye size={16} />
                        <span>{isRtl ? "عرض التفاصيل" : "View Details"}</span>
                      </Link>

                      {order.status === "delivered" && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all shadow-md">
                          <Star size={16} />
                          <span>{isRtl ? "تقييم الطلب" : "Rate Order"}</span>
                        </button>
                      )}

                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md">
                          <RotateCcw size={16} />
                          <span>{isRtl ? "إلغاء الطلب" : "Cancel Order"}</span>
                        </button>
                      )}

                      {order.trackingNumber && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md">
                          <Truck size={16} />
                          <span>{isRtl ? "تتبع الطلب" : "Track Order"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;