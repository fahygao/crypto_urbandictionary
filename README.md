# Crypto Urban Dictionary

A community-driven platform for crypto enthusiasts to learn, share, and contribute to the evolving vocabulary of cryptocurrency slang and terminology.

## About

Crypto Urban Dictionary is designed for crypto "degens" (degenerates) who want to stay up-to-date with the latest crypto slang and terminology. Whether you're a seasoned trader or new to the space, this platform helps you understand the unique language of the crypto community.

## Current Features

- **Term Submission**: Add new crypto terms with definitions and usage examples
- **Browsing**: Explore all submitted terms sorted by date
- **Voting System**: Basic upvote and downvote functionality for each definition
- **RESTful API**: Access dictionary data programmatically
- **Admin Controls**: Moderation capabilities for administrators

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crypto_urbandictionary.git
cd crypto_urbandictionary

# Set up virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

## Usage

Visit `http://localhost:8000` to start using the application.

## Roadmap

### Coming Soon

- **Enhanced User Voting Power**: Weighted voting system based on user reputation and activity
- **Social Media Sharing**: Share interesting terms directly to Twitter, Discord, and other platforms
- **AI Agent Integration**: Automated discovery and addition of new crypto slang from various sources
- **User Profiles**: Personal dictionaries and contribution tracking
- **Mobile App**: Native mobile experience for on-the-go reference

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to discuss new features.
