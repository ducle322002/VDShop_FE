export const ORDER_STATUS = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_INFO = {
  [ORDER_STATUS.PROCESSING]: {
    label: 'Đang xử lý',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  [ORDER_STATUS.SHIPPED]: {
    label: 'Đang giao',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  [ORDER_STATUS.DELIVERED]: {
    label: 'Đã giao',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Đã hủy',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
};
