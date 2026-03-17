import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../core/services/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Erreur getSession:', error.message);
          navigate('/connexion');
          return;
        }

        if (!data.session) {
          console.log('❌ Aucune session trouvée, redirection vers connexion');
          navigate('/connexion');
          return;
        }

        const user = data.session.user;
        console.log('✅ User connecté:', user);

        // Vérifier si le user existe déjà dans artisan
        const { data: artisan, error: artisanError } = await supabase
          .from('artisan')
          .select('*')
          .eq('id_artisan', user.id)
          .maybeSingle();

        console.log('artisan:', artisan);
        console.log('artisanError:', artisanError);

        if (artisan) {
          console.log('➡ Redirection vers dashboard artisan');
          navigate('/dashboard/artisan');
          return;
        }

        // Vérifier si le user existe déjà dans particulier
        const { data: particulier, error: particulierError } = await supabase
          .from('particulier')
          .select('*')
          .eq('id_particulier', user.id)
          .maybeSingle();

        console.log('particulier:', particulier);
        console.log('particulierError:', particulierError);

        if (particulier) {
          console.log('➡ Redirection vers dashboard client');
          navigate('/dashboard/particulier');
          return;
        }

        // Nouveau user => compléter profil via inscription
        console.log('🆕 Nouveau user, redirection vers /inscription');
        navigate('/inscription');
      } catch (err) {
        console.error('Exception dans AuthCallback:', err);
        navigate('/connexion');
      }
    };

    getSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-brand-dark">Connexion en cours...</p>
        <p className="text-sm text-gray-500 mt-2">Veuillez patienter</p>
      </div>
    </div>
  );
}
