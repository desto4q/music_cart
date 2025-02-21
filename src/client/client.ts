import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPAURL as string,
	process.env.NEXT_PUBLIC_SUPAKEY as string
);

export { supabase };
