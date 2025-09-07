-- NexTo Task Management Database Schema
-- Create this in your Supabase SQL editor

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Note: This is a basic policy. In production, you might want more granular policies.
CREATE POLICY "Enable all operations for authenticated users" ON tasks
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow all operations for anon users (for demo purposes)
-- Remove this in production if you want authentication
CREATE POLICY "Enable all operations for anonymous users" ON tasks
  FOR ALL USING (true);

-- Insert some sample data (optional)
INSERT INTO tasks (title, description, priority, due_date) VALUES
  ('Welcome to NexTo', 'Your modern task management application', 'high', CURRENT_DATE + INTERVAL '1 day'),
  ('Setup your workspace', 'Customize your task categories and preferences', 'medium', CURRENT_DATE + INTERVAL '3 days'),
  ('Invite team members', 'Collaborate with others on your projects', 'low', CURRENT_DATE + INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;
