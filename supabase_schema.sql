-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    service TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert (book) an appointment
CREATE POLICY "Allow public insert" 
ON appointments 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (or anyone with the anon/service key depending on dashboard access)
-- For simplicity, since the admin dashboard runs server-side using the service role or direct client,
-- we can allow select, update, delete for authenticated users or define a custom secure access policy.
-- If we access via Next.js Server Actions, Server Actions run on the server side which bypasses standard client RLS
-- if we use the Supabase Service Role Key, or we can use a custom policy.
-- Let's create an policy for select/update/delete for authenticated admin users, or allow it for all during local development.
CREATE POLICY "Allow all actions for service role and authenticated"
ON appointments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- To allow the server-side API to query/update using the anon key (if service role is not used),
-- we can also create a policy or let the server handle it. 
-- Since server actions run on the server and are fully secure, they can also bypass RLS if service_role is used,
-- or we can enable anonymous access with a passcode.
-- Let's provide a policy for read/write for the service role.
