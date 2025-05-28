import { supabase } from '../supabase/client';

export const authService = {
  signUp: async (username, password) => {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      throw new Error('Username is already taken. Please choose a different username.');
    }

    // Insert new user with default last_city as null
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        username, 
        password,
        last_city: null,
        last_unit: 'metric'
      }])
      .select('id, username, last_city, last_unit')
      .single();

    if (error) {
      throw new Error('Failed to create account. Please try again.');
    }

    return data;
  },

  signIn: async (username, password) => {
    // First check if user exists
    const { data: userExists } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (!userExists) {
      throw new Error('User not found. Please sign up to create an account.');
    }

    // Then check password and get user data including last_city
    const { data, error } = await supabase
      .from('users')
      .select('id, username, last_city, last_unit')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error('Incorrect password. Please try again.');
    }

    return data;
  },

  updateLastCity: async (userId, city) => {
    const { data, error } = await supabase
      .from('users')
      .update({ last_city: city })
      .eq('id', userId)
      .select('id, username, last_city, last_unit')
      .single();

    if (error) {
      console.error('Error updating last city:', error);
      throw error;
    }

    // Update localStorage with the new user data
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...currentUser, last_city: city };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    return data;
  },

  updateLastUnit: async (userId, unit) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ last_unit: unit })
        .eq('id', userId)
        .select('id, username, last_city, last_unit')
        .single();

      if (error) {
        throw error;
      }

      // Update localStorage with the new user data
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...currentUser, last_unit: unit };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return data;
    } catch (error) {
      console.error('Error updating last unit:', error);
      throw new Error('Failed to update temperature unit. Please try again.');
    }
  }
}; 