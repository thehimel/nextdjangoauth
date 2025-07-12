/** @type {import('next').NextConfig} */
const nextConfig = {};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

import nextra from 'nextra'

const withNextra = nextra({
  // Add Nextra-specific options here
})

// Combine both plugins
module.exports = withNextIntl(withNextra(nextConfig));
