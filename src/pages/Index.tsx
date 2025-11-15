import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [link, setLink] = useState('');
  const [count, setCount] = useState('');

  const handleSubmit = (service: string) => {
    if (!link || !count) {
      toast({
        title: "Заполните все поля",
        description: "Укажите ссылку и количество",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Заказ принят! 🎉",
      description: `${service}: ${count} шт. будет добавлено в течение 24 часов`,
    });
    
    setLink('');
    setCount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                SMM Накрутка
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Бесплатное продвижение в социальных сетях
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <CardTitle className="text-2xl">100% Бесплатно</CardTitle>
              <CardDescription className="text-base">Никаких скрытых платежей и подписок</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <CardTitle className="text-2xl">Безопасно</CardTitle>
              <CardDescription className="text-base">Гарантия безопасности вашего аккаунта</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
                <Icon name="Rocket" size={28} className="text-white" />
              </div>
              <CardTitle className="text-2xl">Быстро</CardTitle>
              <CardDescription className="text-base">Результат в течение 24 часов</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-2 bg-white/90 backdrop-blur animate-scale-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Выберите услугу
            </CardTitle>
            <CardDescription className="text-lg">Все услуги абсолютно бесплатны</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="boost" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
                <TabsTrigger value="boost" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                  <Icon name="TrendingUp" size={20} className="mr-2" />
                  Буст на посты
                </TabsTrigger>
                <TabsTrigger value="stars" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-accent data-[state=active]:text-white">
                  <Icon name="Star" size={20} className="mr-2" />
                  Звёзды в канал
                </TabsTrigger>
              </TabsList>

              <TabsContent value="boost" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="boost-link" className="text-base">Ссылка на пост</Label>
                    <Input
                      id="boost-link"
                      placeholder="https://t.me/channel/post_id"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="boost-count" className="text-base">Количество буста</Label>
                    <Input
                      id="boost-count"
                      type="number"
                      placeholder="Например: 1000"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <Button
                    onClick={() => handleSubmit('Буст на пост')}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    <Icon name="Sparkles" size={24} className="mr-2" />
                    Получить буст бесплатно
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Icon name="Info" size={20} className="mr-2 text-primary" />
                    Что такое буст?
                  </h3>
                  <p className="text-muted-foreground">
                    Буст увеличивает охват вашего поста, делая его более видимым для аудитории. Это помогает привлечь больше внимания к вашему контенту.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="stars" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stars-link" className="text-base">Ссылка на канал/группу</Label>
                    <Input
                      id="stars-link"
                      placeholder="https://t.me/yourchannel"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stars-count" className="text-base">Количество звёзд</Label>
                    <Input
                      id="stars-count"
                      type="number"
                      placeholder="Например: 500"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <Button
                    onClick={() => handleSubmit('Звёзды в канал')}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    <Icon name="Star" size={24} className="mr-2" />
                    Получить звёзды бесплатно
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-6 mt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Icon name="Info" size={20} className="mr-2 text-secondary" />
                    Что дают звёзды?
                  </h3>
                  <p className="text-muted-foreground">
                    Звёзды повышают рейтинг вашего канала и делают его более привлекательным для новых подписчиков. Это показатель популярности и качества контента.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <div className="text-muted-foreground">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <div className="text-muted-foreground">Выполнено заказов</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-muted-foreground">Круглосуточно</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-muted-foreground">Бесплатно</div>
          </div>
        </div>

        <footer className="mt-20 text-center text-muted-foreground">
          <p className="text-sm">© 2024 SMM Накрутка. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
