import { supabase } from './supabaseClient'

export interface Child {
  id: string
  parent_id: string
  name: string
  hero_key: string
  created_at: string
}

export async function listChildren(): Promise<Child[]> {
  const { data, error } = await supabase.from('children').select('*').order('created_at')
  if (error) throw error
  return data
}

export async function addChild(name: string, heroKey: string): Promise<Child> {
  const { data, error } = await supabase
    .from('children')
    .insert({ name, hero_key: heroKey })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteChild(id: string): Promise<void> {
  const { error } = await supabase.from('children').delete().eq('id', id)
  if (error) throw error
}
