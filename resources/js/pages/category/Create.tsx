import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import React, { FormEvent, useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        category_name: '',
        description: '',
    });
    
    const [successMessage, setSuccessMessage] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/categories', {
            onSuccess: () => {
                setSuccessMessage('Category created successfully! Redirecting...');
            },
        });
    }  

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>Create New Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category_name">Category Name</Label>
                            <Input
                                id="category_name"
                                value={data.category_name}
                                onChange={e => setData('category_name', e.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                            {errors.category_name && (
                                <p className="text-sm text-red-500">{errors.category_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Enter category description"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Category'}
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => router.visit('/categories')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}