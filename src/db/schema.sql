-- Drop all existing tables
DROP TABLE IF EXISTS reservations, items, garages, houses, neighborhoods, archived_items, archived_garages CASCADE;

-- Neighborhoods
CREATE TABLE neighborhoods (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_codes TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Houses
CREATE TABLE houses (
    id UUID PRIMARY KEY,
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    title TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Garages (hosted by a house)
CREATE TABLE garages (
    id UUID PRIMARY KEY,
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
    title TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Items in a garage
CREATE TABLE items (
    id UUID PRIMARY KEY,
    garage_id UUID REFERENCES garages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    price NUMERIC,
    description TEXT,
    is_free BOOLEAN DEFAULT FALSE,
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    ticket_id TEXT UNIQUE NOT NULL,
    reserved_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Archive tables for later reuse
CREATE TABLE archived_garages (
    LIKE garages INCLUDING ALL
);

CREATE TABLE archived_items (
    LIKE items INCLUDING ALL
);