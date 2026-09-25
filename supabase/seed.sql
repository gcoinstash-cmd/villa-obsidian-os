-- ==============================================================================
-- VILLA OBSIDIAN OS — PRODUCTION SEED DATA
-- ==============================================================================

-- 1. SEED PROPERTIES
insert into public.properties (property_code, title, description, price, location, bedrooms, bathrooms, sqft, images, status, amenities, broker_id)
values
(
    'PROP-001',
    'The Obsidian Pavilion',
    'A masterpiece of contemporary brutalism and Japanese-inspired Zen design. This concrete and black charred cedar wood villa is integrated into a windswept cliffside, featuring uninterrupted thermal floor-to-ceiling glass walls, a sunken fire pit lounge, and an infinity pool that merges seamlessly with the ocean horizon.',
    8450000.00,
    'Big Sur, California',
    4,
    4.5,
    6200,
    array[
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85'
    ],
    'available',
    array['Oceanfront Clifftop', 'Charred Cedar Cladding', 'Private Onsen pool', 'Sunken Conversation Pit', 'Tesla Solar Array', 'Professional Chef Kitchen'],
    'broker-alpha'
),
(
    'PROP-002',
    'Minimalist Atrium House',
    'Conceived by award-winning architects, this single-story oasis is organized around a private interior courtyard featuring a solitary specimen maple tree. Raw board-formed concrete walls, structural limestone flooring, and concealed lighting tracks create an atmosphere of monastic serenity and refined quiet luxury.',
    4200000.00,
    'Kyoto Highlands, Japan',
    2,
    2.0,
    3100,
    array[
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85'
    ],
    'available',
    array['Zen Maple Court', 'Board-Formed Concrete', 'Radiant Heated Stone', 'Dual Master Tea Suites', 'Smart Tinting Glazing'],
    'broker-alpha'
),
(
    'PROP-003',
    'The Champagne Penthouse',
    'Occupying the entire top level of a boutique residential tower, this penthouse is designed with a champagne-anodized aluminum skeletal frame. Offers panoramic views of the skyline through custom curved glass corners, featuring honed white travertine cladding and bespoke brass fittings throughout.',
    12500000.00,
    'Tribeca, New York',
    3,
    3.5,
    4800,
    array[
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
    ],
    'pending',
    array['Skydome Skylights', 'Travertine Wellness Spa', 'Helipad Access Portal', 'Private Wine Vault', 'Integrated Audio-Acoustics', 'Wrap-around Champagne Deck'],
    'broker-beta'
),
(
    'PROP-004',
    'The Brutalist Sanctuary',
    'A striking statement of linear geometric forms situated within a lush private pine forest. Raw, exposed architectural steel beams flank high-density basalt tile workspaces and customized oak partitions. Perfect for high-profile clients seeking absolute solitude and bulletproof privacy.',
    6900000.00,
    'Sintra, Portugal',
    5,
    6.0,
    7400,
    array[
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85'
    ],
    'available',
    array['Basalt Tile Floors', 'Private Pine Forest Buffer', 'Biometric Security Gate', 'Subterranean Gallery', 'Infinity Lap Pool'],
    'broker-alpha'
);

-- 2. SEED INQUIRIES
insert into public.inquiries (property_title, client_name, client_email, client_phone, message, status)
values
(
    'The Obsidian Pavilion',
    'Alexander Vance',
    'alex.vance@vanceholdings.ch',
    '+41 22 819 4000',
    'Interested in an immediate escrow close for the Big Sur clifftop estate. Requesting private architectural review and Helipad landing coordinates.',
    'in_progress'
),
(
    'The Champagne Penthouse',
    'Elena Rostova',
    'e.rostova@monacocapital.mc',
    '+377 98 06 20 00',
    'Checking availability for Q4 delivery. Need confirmation on deed title transfer and wine cellar climate telemetry.',
    'new'
);

-- 3. SEED SHOWINGS
insert into public.appointments (property_title, client_id, client_name, broker_id, scheduled_date, scheduled_time, status, private_notes)
values
(
    'The Obsidian Pavilion',
    'client-001',
    'Alexander Vance',
    'broker-alpha',
    '2026-10-12',
    '14:00',
    'confirmed',
    'Private jet arrival into Monterey Peninsula Airport; chauffeur dispatch scheduled.'
),
(
    'Minimalist Atrium House',
    'client-002',
    'Kaito Tanaka',
    'broker-alpha',
    '2026-10-15',
    '11:00',
    'confirmed',
    'Requested quiet walking tour of the Kyoto interior maple courtyard.'
);

-- 4. SEED DOCUMENTS
insert into public.documents (document_code, title, file_url, client_id, broker_id, uploaded_by, file_type)
values
(
    'DOC-001',
    'Lease Agreement: The Obsidian Pavilion',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'client-001',
    'broker-alpha',
    'broker-alpha',
    'application/pdf'
),
(
    'DOC-002',
    'Deed of Title Check: Minimalist Atrium',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'client-002',
    'broker-alpha',
    'broker-alpha',
    'application/pdf'
);
