from django.shortcuts import render, get_object_or_404
from .models import Book, Category  # make sure both are imported

def home(request):
    categories = Category.objects.all()
    return render(request, 'store/home.html', {'categories': categories})

def book_detail(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'store/book_detail.html', {'book': book})

def category_detail(request, category_id):
    category = get_object_or_404(Category, pk=category_id)
    books = category.book_set.all()
    return render(request, 'store/category_detail.html', {
        'category': category,
        'books': books
    })
    
def search(request):
    query = request.GET.get('q')
    results = []

    if query:
        results = Book.objects.filter(title__icontains=query)

    return render(request, 'store/search_results.html', {
        'query': query,
        'results': results
    })




