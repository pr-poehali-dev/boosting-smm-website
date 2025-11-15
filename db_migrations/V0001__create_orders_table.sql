CREATE TABLE IF NOT EXISTS t_p27177844_boosting_smm_website.orders (
    id SERIAL PRIMARY KEY,
    service_type VARCHAR(50) NOT NULL,
    link TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE INDEX idx_orders_status ON t_p27177844_boosting_smm_website.orders(status);
CREATE INDEX idx_orders_created_at ON t_p27177844_boosting_smm_website.orders(created_at DESC);